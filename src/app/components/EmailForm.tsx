import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import TextInput from "./TextInput";
import TextArea from "./TextArea";

const EmailForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<boolean>();
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        form.current ?? "",
        process.env.NEXT_PUBLIC_EMAILJS_KEY
      )
      .then(
        (result) => {
          setLoading(false);
          setSuccess(true);
        },
        (e) => {
          console.error(e.text);
          setLoading(false);
          setError(e.text);
        }
      );
  };

  const [nameEmpty, setNameEmpty] = useState(true);
  const [emailEmpty, setEmailEmpty] = useState(true);
  const [subjectEmpty, setSubjectEmpty] = useState(true);
  const [messageEmpty, setMessageEmpty] = useState(true);

  return (
    <div className="flex items-center justify-center">
      {loading && <label>Loading...</label>}
      {error && <label>{error}</label>}
      {success && <label>success</label>}
      {!loading && !error && !success && (
        <form
          ref={form}
          className="flex flex-col space-y-4 text-sm w-full"
          onSubmit={sendEmail}
        >
          <TextInput
            title="name"
            name={"user_name"}
            onValueChange={setNameEmpty}
          />
          <TextInput
            title="email address"
            name={"user_email"}
            onValueChange={setEmailEmpty}
          />
          <TextInput
            title="subject"
            name={"subject"}
            onValueChange={setSubjectEmpty}
          />
          <TextArea
            title="message"
            name="message"
            onValueChange={setMessageEmpty}
          />
          <div className="flex w-full justify-center pt-4">
            <input
              className="p-2 px-8 border-2 border-default w-fit disabled:border-default/50 disabled:text-default/50 enabled:bg-default enabled:text-dark"
              type="submit"
              value="send"
              disabled={nameEmpty || emailEmpty || subjectEmpty || messageEmpty}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default EmailForm;
