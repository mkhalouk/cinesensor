export class User {
    username!: string;
    password!: string;

    constructor(builder: AUserBuilder) {
        this.username = builder.username;
        this.password = builder.password;
    }
}

export class AUserBuilder {
    username!: string;
    password!: string;

    Username(username: string): AUserBuilder {
        this.username = username;
        return this;
    }

    Password(password: string): AUserBuilder {
        this.password = password;
        return this;
    }

    build(): User {
        return new User(this);
    }
}

