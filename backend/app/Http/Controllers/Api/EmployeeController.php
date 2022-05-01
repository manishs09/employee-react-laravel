<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Http\Requests\Employee\AddEmployeeRequest;
use App\Http\Requests\Employee\UpdateEmployeeRequest;
use App\Traits\Payload;
use App\Traits\Uploads;

class EmployeeController extends Controller
{
    use Uploads, Payload;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Employee::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\AddEmployeeRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AddEmployeeRequest $request)
    {
        $data = $request->validated();
        if (!empty($request->photo)) {
            $fileName = Uploads::uploadFile($request);
            $data = array_merge($data, ['photo' => $fileName]);
        }
        if ($data = Employee::create($data)) {
            return $this->success(__('employee.add_success'), $data);
        } else {
            return $this->fail(__('employee.add_fail'));
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  Integer  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $employee = Employee::find($id);
        if (!$employee) {
            return $this->fail(__('employee.not_found'));
        }

        return $this->success('', $employee);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  App\Http\Requests\Employee\UpdateEmployeeRequest  $request
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        $data = $request->validated();
        if (!empty($request->photo)) {
            $employee->photo = Uploads::uploadFile($request, $employee->photo);
        }
        $employee->first_name = $data['first_name'];
        $employee->last_name = $data['last_name'];
        $employee->job_title = $data['job_title'];

        if ($employee->save()) {
            return $this->success(__('employee.update_success'), $employee);
        } else {
            return $this->fail(__('employee.update_fail'));
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Integer $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $employee = Employee::find($id);

        if (!$employee) {
            return $this->fail(__('employee.not_found'));
        }

        if (!empty($employee->photo)) {
            Uploads::deleteFile('employee' . DIRECTORY_SEPARATOR . $employee->photo);
        }

        if ($employee->delete()) {
            return $this->success(__('employee.delete_success'), ["id" => $employee->id]);
        } else {
            return $this->fail(__('employee.delete_fail'));
        }
    }
}
