<?php
/**
 * Creates symbolic link for Laravel storage on shared hosting
 * DELETE THIS FILE AFTER USE!
 */

// Adjust these paths for your Hostinger setup
$targetFolder = __DIR__ . '/../storage/app/public';
$linkFolder = __DIR__ . '/storage';

// Check if running on Hostinger (different structure)
if (!file_exists($targetFolder)) {
    // Try Hostinger-style path (laravel_app outside public_html)
    $targetFolder = dirname(__DIR__, 2) . '/laravel_app/storage/app/public';
}

echo "<h2>Storage Link Creator</h2>";
echo "<p><strong>Target:</strong> " . realpath($targetFolder) . "</p>";
echo "<p><strong>Link:</strong> " . $linkFolder . "</p>";

if (file_exists($linkFolder)) {
    echo "<p style='color: orange;'>⚠️ Storage link already exists!</p>";
    echo "<p>Path: " . (is_link($linkFolder) ? readlink($linkFolder) : 'Not a symlink') . "</p>";
} elseif (!file_exists($targetFolder)) {
    echo "<p style='color: red;'>❌ Target folder does not exist: $targetFolder</p>";
    echo "<p>Available paths:</p>";
    echo "<pre>" . print_r(glob(__DIR__ . '/../*'), true) . "</pre>";
} else {
    if (symlink($targetFolder, $linkFolder)) {
        echo "<p style='color: green;'>✅ Symbolic link created successfully!</p>";
    } else {
        echo "<p style='color: red;'>❌ Failed to create symbolic link. Try manual method.</p>";
        echo "<p>Alternative: Create folder and copy files instead.</p>";
        
        // Fallback: Copy files if symlink fails (some hosts don't allow symlinks)
        echo "<p>Attempting to create storage folder and copy files...</p>";
        if (!is_dir($linkFolder)) {
            mkdir($linkFolder, 0755, true);
        }
        
        // Copy portfolios folder
        $portfoliosSrc = $targetFolder . '/portfolios';
        $portfoliosDst = $linkFolder . '/portfolios';
        
        if (is_dir($portfoliosSrc)) {
            if (!is_dir($portfoliosDst)) {
                mkdir($portfoliosDst, 0755, true);
            }
            
            $files = scandir($portfoliosSrc);
            foreach ($files as $file) {
                if ($file !== '.' && $file !== '..') {
                    copy($portfoliosSrc . '/' . $file, $portfoliosDst . '/' . $file);
                    echo "<p>Copied: $file</p>";
                }
            }
            echo "<p style='color: green;'>✅ Files copied successfully!</p>";
        }
    }
}

echo "<hr>";
echo "<p style='color: red; font-weight: bold;'>⚠️ DELETE THIS FILE AFTER USE FOR SECURITY!</p>";
