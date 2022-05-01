<?php

namespace App\Traits;

trait Payload
{
    protected function success($message = "", $data = [])
    {
        $payload = ["success" => true];
        if (!empty($message)) {
            $payload["message"] = $message;
        }
        if (!empty($data)) {
            $payload["data"] = $data;
        }
        return $payload;
    }

    protected function fail($message = "", $data = [])
    {
        $payload = ["success" => false];
        if (!empty($message)) {
            $payload["message"] = $message;
        }
        if (!empty($data)) {
            $payload["data"] = $data;
        }
        return $payload;
    }
}
