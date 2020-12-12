<?php

namespace App\Exception;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;

class CustomErrorMessageException extends HttpException
{
    public function __construct(
        string $message = null,
        int $statusCode = 422,
        Throwable $previous = null,
        array $headers = ['Content-Type' => 'application/custom-error-message'],
        ?int $code = 0
    ) {
        parent::__construct($statusCode, $message, $previous, $headers, $code);
    }
}
