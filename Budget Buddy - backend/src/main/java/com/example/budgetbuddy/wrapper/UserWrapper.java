package com.example.budgetbuddy.wrapper;

import jakarta.persistence.NamedQuery;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserWrapper {
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private String userName;
    private String status;

}
