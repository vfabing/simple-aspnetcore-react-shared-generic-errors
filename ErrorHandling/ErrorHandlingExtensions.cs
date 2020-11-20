using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using System.Net;

namespace simple_aspnetcore_react_shared_generic_errors.ErrorHandling
{
    public static class ErrorHandlingExtensions
    {
        public static ObjectResult CreateErrorResult(this ActionContext context, ApiErrorCode errorCode, object additionalDetails = null)
        {
            var problemDetailsFactory = context.HttpContext.RequestServices.GetRequiredService<ProblemDetailsFactory>();
            var problemDetails = problemDetailsFactory.CreateProblemDetails(context.HttpContext, statusCode: (int?)HttpStatusCode.BadRequest);

            problemDetails.Extensions["code"] = errorCode;

            if (additionalDetails != null)
            {
                problemDetails.Extensions["additionalDetails"] = additionalDetails;
            }

            return new ObjectResult(problemDetails);
        }
    }
}
