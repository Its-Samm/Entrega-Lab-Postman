export class UpdateFacultDTO {
  private constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly status: boolean,
  ) {}

  static create(
    object: { [key: string]: any },
  ): [string | undefined, UpdateFacultDTO?] {
    const {
      id,
      name,
      description,
      status
    } = object;

    if (!id) return ["Missing id"];
    if (!name) return ["Missing name"];
    if (!description) return ["Missing description"];
    if (!status) return ["Missing status"];

    if (name && name.length > 100)
      return ["name is too large, max length is 100 characters"];

    if (description && description.length > 255)
      return ["description is too large, max length is 255 characters"];

    if (status && typeof status !== "boolean")
      return ["Invalid status"];

    //Crear DTO
    return [
      undefined,
      new UpdateFacultDTO(
        name,
        description,
        status
      ),
    ];
    
  }
}