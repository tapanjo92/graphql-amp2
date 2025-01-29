interface ActionButtonsProps {
    handleSignOut: () => void;
  }
  
  const ActionButtons: React.FC<ActionButtonsProps> = ({ handleSignOut }) => {
    return (
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleSignOut}
          className="px-6 py-2.5 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
          aria-label="Sign Out"
          tabIndex={0}
        >
          Sign Out
        </button>
      </div>
    );
  };
  
  export default ActionButtons;
