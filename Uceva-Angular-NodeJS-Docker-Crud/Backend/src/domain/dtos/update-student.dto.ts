
export class UpdateStudentDTO {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly address: string,
    public readonly birthdate: Date,
    public readonly semester: number,
    public readonly status: boolean,
  ) {}

  static create(
    object: { [key: string]: any },
  ): [string | undefined, UpdateStudentDTO?] {
    const {
      name,
      email,
      phone,
      address,
      birthdate,
      semester,
      status
    } = object;

    if (!name) return ["Missing name"];
    if (!email) return ["Missing email"];
    if (!phone) return ["Missing phone"];
    if (!address) return ["Missing address"];
    if (!birthdate) return ["Missing birthdate"];
    if (!semester) return ["Missing semester"];
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

    if (semester && (semester < 1 || semester > 10))
      return ["Invalid semester"];

    if (status && typeof status !== "boolean")
      return ["Invalid status"];

    //Crear DTO
    return [
      undefined,
      new UpdateStudentDTO(
        name,
        email,
        phone,
        address,
        birthdate,
        semester,
        status
      ),
    ];
  }
}