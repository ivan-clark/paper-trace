using sib_api_v3_sdk.Api;
using sib_api_v3_sdk.Model;

namespace API.Utils
{
    public class EmailSender
    {
        public static void Send(Email email)
        {
            var apiInstance = new TransactionalEmailsApi();
            SendSmtpEmailSender sender = new SendSmtpEmailSender(email.SenderName, email.SenderEmail);
            SendSmtpEmailTo receiver = new SendSmtpEmailTo(email.ReceiverEmail, email.ReceiverName);

            List<SendSmtpEmailTo> To = new List<SendSmtpEmailTo>();
            To.Add(receiver);

            var sendSmtpEmail = new SendSmtpEmail(sender, To, null, null, null, email.Message, email.Subject);
            apiInstance.SendTransacEmail(sendSmtpEmail);
        }
    }

    public class Email
    {
        public string? SenderEmail { get; set; }
        public string? SenderName { get; set; }
        public string? ReceiverEmail { get; set; }
        public string? ReceiverName { get; set; }
        public string? Subject { get; set; }
        public string? Message { get; set; }
    }
}
