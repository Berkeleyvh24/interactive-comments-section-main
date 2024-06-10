import { useContext } from "react";
import { CommentsContext } from "../context";
import "./deleteModal.css";

export default function DeleteModal() {
  const { modalDisplayOpened, setModalDisplayOpened } =
    useContext(CommentsContext);

  return (
    <div className="modal">
      {modalDisplayOpened && (
        <div className="modal-card">
          <div className="modal-inner-card">
            <h3>Delete comment</h3>
            <p>
              Are you sure you want to delete this comment? This will remove the
              comment and cant be undone.
            </p>
            <div className="modal-card-buttons">
              <button onClick={() => setModalDisplayOpened!(false)}>
                NO, CANCEL
              </button>
              <button>YES, DELETE</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
