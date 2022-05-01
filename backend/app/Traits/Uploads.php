<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;

trait Uploads
{
    public static function uploadFile($request, $oldPhoto = ''): string
    {
        $fileName = time() . '.' . $request->photo->getClientOriginalExtension();
        $request->file('photo')->storeAs('employee', $fileName,'public');

        if (!empty($oldPhoto) && Storage::exists('employee' . DIRECTORY_SEPARATOR . $oldPhoto)) {
            Storage::delete('employee' . DIRECTORY_SEPARATOR . $oldPhoto);
        }
        return $fileName;
    }

    public static function deleteFile($path): bool
    {
        if (empty($path) || !Storage::exists($path)) {
            return false;
        }
        return Storage::delete($path);
    }
}
