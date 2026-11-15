# resize-images.ps1 — מכווץ את כל תמונות הקטגוריות לרוחב מקסימלי 1600 (hero) / 1200 (גלריה),
# מקודד מחדש כ-JPEG באיכות 78, ומשאיר webp כמו שהוא (GDI+ לא קורא webp).
# הרצה: powershell -ExecutionPolicy Bypass -File tools/resize-images.ps1

Add-Type -AssemblyName System.Drawing
$imgDir = Join-Path $PSScriptRoot "..\site\assets\images"

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq 'image/jpeg' }

function Save-Jpeg($image, $path, $quality) {
    $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
        [System.Drawing.Imaging.Encoder]::Quality, [long]$quality)
    $image.Save($path, $jpegCodec, $ep)
}

$totalBefore = 0; $totalAfter = 0; $count = 0

Get-ChildItem -Path $imgDir -Recurse -Include *.jpg, *.jpeg, *.png | ForEach-Object {
    $file = $_
    $isHero = $file.BaseName -eq 'hero'
    $maxW = if ($isHero) { 1600 } else { 1200 }
    $target = Join-Path $file.DirectoryName ($file.BaseName + '.jpg')
    try {
        $img = [System.Drawing.Image]::FromFile($file.FullName)
        $w = $img.Width; $h = $img.Height
        $newW = [Math]::Min($w, $maxW)
        $newH = [int]($h * $newW / $w)
        $bmp = New-Object System.Drawing.Bitmap($newW, $newH)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.DrawImage($img, 0, 0, $newW, $newH)
        $g.Dispose(); $img.Dispose()
        Save-Jpeg $bmp $target 78
        $bmp.Dispose()
        $before = $file.Length
        if ($target -ne $file.FullName) { Remove-Item $file.FullName -Force }
        $after = (Get-Item $target).Length
        $script:totalBefore += $before; $script:totalAfter += $after; $script:count++
        if ($before -gt 1500000) {
            Write-Output ("{0}: {1:N1}MB -> {2:N1}MB ({3}x{4})" -f `
                $file.FullName.Replace($imgDir, ''), ($before/1MB), ($after/1MB), $newW, $newH)
        }
    } catch {
        Write-Output ("SKIP " + $file.Name + ": " + $_.Exception.Message)
    }
}

Write-Output ("מכווצו {0} תמונות: {1:N1}MB -> {2:N1}MB" -f $count, ($totalBefore/1MB), ($totalAfter/1MB))
