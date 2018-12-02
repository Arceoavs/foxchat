<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Response;
use View;

use Illuminate\Support\Facades\Log;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        if(auth()->user()===null){
            $exception = new AuthenticationException();
            $this->unauthenticated($request, $exception);
        }
        //Catch the exception, if a url is opened which is not valid
        if ($exception instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException){
            return response()->json(
                [
                    'errors' => [
                        'status' => 404,
                        'message' => 'Invalid url',
                    ]
                ],
                404
            );
        }elseif ($exception instanceof \Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException){
            return response()->json(
                [
                    'errors' => [
                        'status' => 405,
                        'message' => 'Method not allowed! Please check your method.',
                    ]
                ],
                405
            );
        }
        return parent::render($request, $exception);
    }

    /**
     * Convert an authentication exception into a response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Auth\AuthenticationException  $exception
     * @return \Illuminate\Http\Response
     */

    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if($request->wantsJson()){
            return response()->json(
                [
                    'errors' => [
                        'status' => 401,
                        'message' => 'Unauthorized',
                    ]
                ],
                401
            );
        }else{
            return redirect()->route('standard');
        }
    }
}
