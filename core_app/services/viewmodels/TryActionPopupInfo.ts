export interface TryActionPopupInfo {
  title: string;
  okTitle?: string;
  cancelTitle?: string;
  message: string;
  action: () => Promise<boolean>;
  onOk: () => Promise<void>;
  onCancel: () => Promise<void>;
  canCancel?: () => Promise<boolean>;
}
