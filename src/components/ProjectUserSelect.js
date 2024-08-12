import React, { useState, useEffect } from "react";
import Select from '../components/Select'
import { useIsFocused } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import userService from "../services/UserService";
import User from "../helper/User";


const ProjectUserSelect = ({ selectedUserId, label,projectId, onChange, required, placeholder, divider, disable, control, name, showBorder }) => {
    const [userList, setUserList] = useState([]);
    const isFocused = useIsFocused();
    useEffect(() => {
        getUserList();
    }, [isFocused,projectId]);
    const getUserList = async() => {
        await userService.getProjectUserList({projectId : projectId}, (response) => {
            setUserList(response);

        })
    }

    return (
        <Select
            control={control}
            options={userList}
            getDetails={(values) => onChange && onChange(values)}
            label={label}
            placeholder={placeholder}
            data={selectedUserId}
            name={name}
            divider={divider}
            disable={disable}
            showBorder={showBorder}
            required={required}
            userCard
        />
    )
};
export default ProjectUserSelect;
