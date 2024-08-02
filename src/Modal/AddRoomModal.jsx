import { Modal, Form, Input } from "antd";
import { useContext } from "react";
import { AppContext } from "../Context/AppProvider";
import { addDocument } from "../firebase/services";
import { AuthContext } from "../Context/AuthProvider";

export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const  user  = useContext(AuthContext);
  const [form] = Form.useForm();
 
  const handleOk = () => {
    if (user) {
      addDocument("rooms", { ...form.getFieldsValue(), members: [user.uid] });
      form.resetFields();
      setIsAddRoomVisible(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsAddRoomVisible(false);
  };

  return (
    <div>
      <Modal
        title="Tạo phòng"
        visible={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form}>
          <Form.Item label="Tên phòng" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Thêm ảnh" name="photoURL">
            <Input.TextArea placeholder="Thêm ảnh " />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
