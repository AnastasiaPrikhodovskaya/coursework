package com.prihodovskaya.marketing.models.base;

import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@MappedSuperclass
public abstract class NamedEntity extends BaseEntity {

    @NotNull
    @Size(max = 512)
    public String name;
}
