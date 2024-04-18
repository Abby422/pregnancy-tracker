// AddPostDialog.js
import React from "react";
import { Portal, Dialog, TextInput, Paragraph,Button } from "react-native-paper";

const AddPostDialog = ({
  visible,
  hideDialog,
  selectedPost,
  handleComment,
  comment,
  setComment,
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>{selectedPost.title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{selectedPost.content}</Paragraph>
          <TextInput
            label="Your Comment"
            value={comment}
            onChangeText={setComment}
            style={styles.commentInput}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleComment}>Comment</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default AddPostDialog;

const styles = {
    commentInput: {
        marginBottom: 10,
    },
}