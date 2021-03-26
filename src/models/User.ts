import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  private events: Eventing = new Eventing();
  private sync: Sync<UserProps> = new Sync<UserProps>("users");
  private attributes: Attributes<UserProps>;

  constructor(userData: UserProps) {
    this.attributes = new Attributes<UserProps>(userData);
  }

  public get on() {
    return this.events.on;
  }

  public get trigger() {
    return this.events.trigger;
  }

  public get get() {
    return this.attributes.get;
  }

  public set(update: UserProps): void {
    this.trigger("change");
    this.attributes.set(update);
  }

  public async fetch(): Promise<void> {
    const id = this.attributes.get("id");

    if (id) {
      const response = await this.sync.fetch(id);
      this.attributes.set(response.data);
    } else {
      throw new Error("ID is not declared within User");
    }
  }

  public async save(): Promise<void> {
    try {
      await this.sync.save(this.attributes.getAll());
      this.trigger("saveSuccess");
    } catch (e) {
      this.trigger("saveError");
    }
  }
}
