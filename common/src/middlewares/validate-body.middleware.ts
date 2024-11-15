import Ajv from "ajv";
import { NextFunction, Request, Response } from "express";
import { RequestValidationError } from "../errors/request-validation.error";
const validate = (schema: any, body: any) => {
  const ajv = new Ajv({ allErrors: true });
  ajv.addFormat("email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  ajv.addFormat(
    "date-time",
    /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/
  );
  ajv.addFormat(
    "data-url",
    new RegExp(/data:((?:\w+\/(?:(?!;).)+)?)((?:;[\w\W]*?[^;])*),(.+)$/)
  );

  const validate = ajv.compile(schema);
  let valid = validate(body);
  if (!valid && validate.errors) {
    return { valid: false, errors: validate.errors };
  }
  return { valid: true, errors: [] };
};

function validateBodyMiddleware(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    let { valid, errors } = validate(schema, req.body);
    if (valid) {
      next();
    } else {
      throw new RequestValidationError(errors);
    }
  };
}
export { validateBodyMiddleware };
