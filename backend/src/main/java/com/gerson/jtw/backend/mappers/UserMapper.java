package com.gerson.jtw.backend.mappers;

import com.gerson.jtw.backend.dtos.SignUpDto;
import com.gerson.jtw.backend.dtos.UserDto;
import com.gerson.jtw.backend.entites.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto signUpDto);

}