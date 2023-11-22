
using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Transcom.Domain.Model;
using Transcom.Infra.Exceptions;

namespace Transcom.Infra.Middlewares
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            var response = context.Response;
            ErrorResponse errorResponse = new();

          
            var systemException = exception as BaseException;
            response.StatusCode = (int)systemException.StatusCode;
            response.Headers.Add("Access-Control-Allow-Origin", "*");
            response.Headers.Add("Access-Control-Allow-Headers", "Authorization, Content-Type");
            response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            errorResponse.ResponseText = exception.Message;
            var result = JsonSerializer.Serialize(errorResponse);
         
            await context.Response.WriteAsync(result);
        }
    }
}
