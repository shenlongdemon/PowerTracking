export interface CommonConfirmInfo {
  text: string;
  okText: string;
  cancelText: string;
  onOK: () => void;
  onCancel: () => void;
}
