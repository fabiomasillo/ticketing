import express, { Request, Response } from "express";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import { validateBodyMiddleware, BadRequestError } from "@fabio/common";
const router = express.Router();

const bodySchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: { type: "string", format: "email", minLength: 12 },
    password: { type: "string" },
  },
  additionalProperties: false,
};

router.post(
  "/api/users/signup",
  validateBodyMiddleware(bodySchema),
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("email in use");
      throw new BadRequestError("email in use");
    }
    const user = User.build({ email, password });
    await user.save();
    // generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );
    // store it in session object
    req.session = {
      jwt: userJwt,
    };
    res.status(201).send(user);
    return;
  }
);

export { router as signupRouter };
