<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <link rel="shortcut icon" type="image/png" href="/img/foxChat_kurz.png"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" type="text/css" href="/css/app.css">
        <title>foxChat</title>

    </head>
    {{-- <script src="http://localhost:8098"></script> --}}
    <body>
        <div id="app"></div>
        <script type="text/javascript" src="/js/app.js"></script>
    </body>
</html>
