namespace Transcom.Domain.Model
{
    public class ErrorResponse : DefaultResultResponse
    {
        public ErrorResponse()
        {
            Success = false;
        }
    }
}
