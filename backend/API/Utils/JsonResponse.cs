namespace API.Utils
{
    public sealed class JsonResponse
    {
        public JsonResponse()
        {
            IsError = false;
            Message = "";
            Data = null;
        }

        public bool IsError { get; private set; }
        public string Message { get; private set; }
        public object? Data { get; private set; }

        public JsonResponse Success()
        {
            IsError = false;
            Message = "Success";
            return this;
        }

        public JsonResponse Error()
        {
            IsError = true;
            Message = "Error";
            return this;
        }

        public JsonResponse Msg(string message)
        {
            Message = message;
            return this;
        }

        public JsonResponse For(object data)
        {
            Data = data;
            return this;
        }
    }
}
