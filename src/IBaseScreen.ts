export interface IBaseScreen {
  componentBlur: () => Promise<void>;
  componentFocus: () => Promise<void>;
}
