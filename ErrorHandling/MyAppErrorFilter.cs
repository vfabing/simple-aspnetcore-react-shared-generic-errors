using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using simple_aspnetcore_react_shared_generic_errors.Exceptions;
using System.Net;

namespace simple_aspnetcore_react_shared_generic_errors.ErrorHandling
{
    public class MyAppErrorFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            if (context.ExceptionHandled)
            {
                return;
            }

            var result = context.Exception switch
            {
                EntityNotFoundException _ => context.CreateErrorResult(ApiErrorCode.EntityNotFound),
                InvalidStatusChangeException ex => context.CreateErrorResult(ApiErrorCode.InvalidStatusChange, additionalDetails: new { ex.AllowedStatus }),
                _ => null
            };

            if (result != null)
            {
                result.DeclaredType = typeof(ProblemDetails);
                result.ContentTypes.Add("application/problem+json");
                context.Result = result;
                context.HttpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                context.ExceptionHandled = true;
            }
        }
    }
}
