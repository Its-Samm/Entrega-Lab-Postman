
export class UpdateTeacherDTO {
  private constructor(
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
  ): [string | undefined, UpdateTeacherDTO?] {
    const {
      name,
      email,
      phone,
      address,
      birthdate,
      role,
      status
    } = object;

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

    if (role && (role < 1 || role > 10))
      return ["Invalid role"];

    if (status && typeof status !== "boolean")
      return ["Invalid status"];

    //Crear DTO
    return [
      undefined,
      new UpdateTeacherDTO(
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