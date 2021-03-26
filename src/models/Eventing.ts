enum EventName {
  change = "change",
  saveSuccess = "saveSuccess",
  saveError = "saveError",
}

export type Event = keyof typeof EventName;

interface EventHandlers {
  [eventName: string]: EventCallback[];
}

export type EventCallback = () => void;

export class Eventing {
  private eventHandlers: EventHandlers = {};

  public on = (eventName: Event, callback: EventCallback): void => {
    this.eventHandlers[eventName] = this.eventHandlers[eventName] || [];
    this.eventHandlers[eventName].push(callback);
  };

  public trigger = (eventName: Event): void => {
    const handlers = this.eventHandlers[eventName];

    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach((eventCallback) => {
      eventCallback();
    });
  };
}
