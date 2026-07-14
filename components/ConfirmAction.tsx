"use client";

interface ConfirmActionProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmAction = ({
  message,
  onConfirm,
  onCancel,
}: ConfirmActionProps) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/70">
      <div className="bg-card shadow-lg p-6 rounded-lg">
        <p className="mb-4 font-medium text-lg">{message}</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn-primary">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAction;
