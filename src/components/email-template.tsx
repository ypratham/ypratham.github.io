import * as React from "react";

interface EmailTemplateProps {
  fullName: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  fullName,
  email,
  message,
}) => (
  <div
    style={{
      display: "flex",
      gap: "10px",
      flexDirection: "column",
    }}
  >
    <p>
      Full name: <strong>{fullName}</strong>
    </p>
    <p>
      Email: <strong>{email}</strong>
    </p>
    <p>
      Full name: <strong>{message}</strong>
    </p>
  </div>
);
