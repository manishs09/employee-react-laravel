<?php

use App\Http\Controllers\Api\EmployeeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::controller(EmployeeController::class)->prefix('employee')->group(function () {
    Route::get('/', 'index');
    Route::get('/{employee}', 'show');
    Route::post('/', 'store');
    Route::put('/{employee}', 'update');
    Route::delete('/{employee}', 'destroy');
});
