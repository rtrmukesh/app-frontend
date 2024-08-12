// Import React and Component
import React from "react";
import { StyleSheet } from "react-native";

import TextInput from "../components/Text";

const SignUpForm = ({ control, showPassword }) => {

    return (
        <>
            <TextInput
                title={"Fist Name"}
                control={control}
                placeholder={"Enter First Name"}
                name={"firstName"}
                keyboardType={"text"}
                required={true}
            />

            <TextInput
                title={"Last Name"}
                control={control}
                placeholder={"Enter Last Name"}
                name={"lastName"}
                keyboardType={"text"}
                required={true}
            />

            <TextInput
                title={"Email"}
                control={control}
                placeholder={"Enter Email"}
                name={"email"}
                keyboardType={"email-address"}
                required={true}
            />

            <TextInput
                title={"Mobile"}
                control={control}
                placeholder={"Enter Mobile Number"}
                name={"mobileNumber"}
                keyboardType={"numeric"}
                required={true}
            />


            {showPassword && (
                <>
                    <TextInput
                        title={"Password"}
                        control={control}
                        placeholder="Password"
                        name={"password"}
                        secureTextEntry={true}
                        required={true}
                    />

                    <TextInput
                        title={"Confirm Password"}
                        control={control}
                        placeholder="Confirm Password"
                        name={"confirmPassword"}
                        secureTextEntry={true}
                        required={true}
                    />
                </>
            )}

        </>

    );
};
export default SignUpForm;