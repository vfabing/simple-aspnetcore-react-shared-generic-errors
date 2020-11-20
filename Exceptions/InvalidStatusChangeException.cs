using System;

namespace simple_aspnetcore_react_shared_generic_errors.Exceptions
{
    public class InvalidStatusChangeException : Exception
    {
        public string[] AllowedStatus { get; set; }

        public InvalidStatusChangeException(string[] allowedStatus)
        {
            AllowedStatus = allowedStatus;
        }
    }
}
