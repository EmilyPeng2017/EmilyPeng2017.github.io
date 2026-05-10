# PowerShell script to update all blog HTML files with modern theme CSS
# This adds modern-theme.css and Google Fonts to all blog posts

param(
    [string]$RootDir = "e:\hexo"
)

function Update-BlogFile {
    param(
        [string]$FilePath
    )
    
    # Read the file
    $content = Get-Content -Path $FilePath -Raw -Encoding UTF8
    
    # Check if already updated
    if ($content -contains "modern-theme.css") {
        Write-Host "Skipping (already updated): $FilePath" -ForegroundColor Yellow
        return
    }
    
    # Find the default.css link and add our CSS and fonts after it
    $oldPattern = '<link rel="stylesheet" href="[^"]*default\.css">'
    
    # Pattern to detect relative path depth (for ../css/default.css, ../../../../css/default.css, etc)
    $matches = [regex]::Match($FilePath, '\\([0-9]{4})\\([0-9]{2})\\([0-9]{2})\\')
    
    if ($matches.Success) {
        # This is a blog post in YYYY/MM/DD structure
        $cssPath = "../../../css/modern-theme.css"
    } else {
        # Might be archives or other pages
        $cssPath = "../css/modern-theme.css"
    }
    
    # New content to inject
    $newContent = '<link data-pjax rel="stylesheet" href="' + $cssPath + '"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Fira+Sans:wght@400;500;700;800&family=Source+Code+Pro:wght@400;600;800&display=swap" rel="stylesheet">'
    
    # Find the line with default.css and insert our CSS after it
    if ($content -match 'rel="stylesheet" href="[^"]*default\.css"') {
        # Insert after default.css link
        $updatedContent = $content -replace '(<link[^>]*default\.css"[^>]*>)', ('$1' + [Environment]::NewLine + '  ' + $newContent)
        
        # Write back to file
        Set-Content -Path $FilePath -Value $updatedContent -Encoding UTF8 -NoNewline
        
        Write-Host "Updated: $FilePath" -ForegroundColor Green
        return $true
    }
    
    return $false
}

# Main execution
Write-Host "Starting blog modernization..." -ForegroundColor Cyan
Write-Host "Root directory: $RootDir" -ForegroundColor Cyan
Write-Host ""

$count = 0
$updated = 0

# Find all HTML files in blog date directories
Get-ChildItem -Path $RootDir -Recurse -Include "index.html" | ForEach-Object {
    $file = $_.FullName
    
    # Check if it's a blog post (in 2024, 2025, 2026, etc directories)
    if ($file -match '\\(20[0-9]{2})\\') {
        $count++
        if (Update-BlogFile -FilePath $file) {
            $updated++
        }
    }
}

Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "Total blog files found: $count" -ForegroundColor White
Write-Host "Files updated: $updated" -ForegroundColor Green
Write-Host ""
Write-Host "Blog modernization complete!" -ForegroundColor Green

# Also update archives and category pages
Write-Host ""
Write-Host "Updating archive and category pages..." -ForegroundColor Cyan

$archivePages = @(
    "$RootDir\archives\index.html",
    "$RootDir\categories\index.html",
    "$RootDir\tags\index.html",
    "$RootDir\blog\index.html"
)

$archivePages | ForEach-Object {
    if (Test-Path $_) {
        $content = Get-Content -Path $_ -Raw -Encoding UTF8
        
        if ($content -notcontains "modern-theme.css") {
            # Determine correct CSS path based on file location
            if ($_ -like "*archives*" -or $_ -like "*categories*" -or $_ -like "*tags*" -or $_ -like "*blog*") {
                $cssPath = "./css/modern-theme.css"
            }
            
            $newContent = '<link rel="stylesheet" href="' + $cssPath + '"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Fira+Sans:wght@400;500;700;800&family=Source+Code+Pro:wght@400;600;800&display=swap" rel="stylesheet">'
            
            $updatedContent = $content -replace '(<link[^>]*default\.css"[^>]*>)', ('$1' + [Environment]::NewLine + '  ' + $newContent)
            
            Set-Content -Path $_ -Value $updatedContent -Encoding UTF8 -NoNewline
            
            Write-Host "Updated: $_" -ForegroundColor Green
        }
    }
}

Write-Host ""
Write-Host "All updates complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Review the changes in your browser"
Write-Host "2. Test all blog pages and archives"
Write-Host "3. Clear your browser cache if needed"
Write-Host ""
