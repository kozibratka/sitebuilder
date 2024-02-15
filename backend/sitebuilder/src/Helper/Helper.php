<?php

namespace App\Helper;

class Helper
{
    public static function getSize($bytes)
    {
        if ($bytes > 0)
        {
            $unit = intval(log($bytes, 1024));
            $units = array('B', 'KB', 'MB', 'GB');

            if (array_key_exists($unit, $units) === true)
            {
                return sprintf('%d %s', $bytes / pow(1024, $unit), $units[$unit]);
            }
        }

        return $bytes;
    }

    public static function validFileName($name) {
        return strpbrk($name, "\\/?%*:|\"<>") === FALSE;
    }

    public static function randomString($length = 10) {
        return bin2hex(random_bytes($length));
    }
}
