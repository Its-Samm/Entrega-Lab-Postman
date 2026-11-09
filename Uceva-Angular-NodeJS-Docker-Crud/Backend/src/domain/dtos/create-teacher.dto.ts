export class CreateTeacherDTO {
  private constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly address: string,
    public readonly birthdate: Date,
    public readonly role: string,
    public readonly status: boolean,
  ) {}

  static create(
    object: { [key: string]: any },
  ): [string | undefined, CreateTeacherDTO?] {
    const {
      id,
      name,
      email,
      phone,
      address,
      birthdate,
      role,
      status
    } = object;

    if (!id) return ["Missing id"];
    if (!name) return ["Missing name"];
    if (!email) return ["Missing email"];
    if (!phone) return ["Missing phone"];
    if (!address) return ["Missing address"];
    if (!birthdate) return ["Missing birthdate"];
    if (!role) return ["Missing role"];
    if (!status) return ["Missing status"];

    if (name && name.length > 100)
      return ["name is too large, max length is 100 characters"];

    if (email && email.length > 150)
      return ["email is too large, max length is 150 characters"];

    if (phone && phone.length > 10)
      return ["phone is too large, max length is 10 characters"];

    if (address && address.length > 150)
      return ["address is too large, max length is 150 characters"];

    if (birthdate && birthdate > new Date())
      return ["Invalid birthdate"];

    if (role && role.length > 3)
      return ["role is too large, max length is 3 characters"];

    if (status && typeof status !== "boolean")
      return ["Invalid status"];

    //Crear DTO
    return [
      undefined,
      new CreateTeacherDTO(
        id,
        name,
        email,
        phone,
        address,
        birthdate,
        role,
        status
      ),
    ];
    
  }
}