<?php

namespace App\Http\Requests\Employee;

use App\Traits\Payload;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class AddEmployeeRequest extends FormRequest
{
    use Payload;
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'first_name' => 'required|max:250',
            'last_name' => 'required|max:250',
            'email' => 'required|email|unique:employees|max:255',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'job_title' => 'required|max:255'
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($this->fail('Validation errors', $validator->errors())));
    }
}
