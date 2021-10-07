import { Row, Col, Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { httpService } from '@rnm/ui';
import { LoginDto } from '@rnm/model';

import styles from './login.module.scss';

function Login() {
  const { t, i18n } = useTranslation();

  const onFinish = (user: LoginDto) => {
    httpService.post<any>('/api/auth/login', user).subscribe((result: any) => {
      console.log('Success:', result);
      // redirect index.html of dashboard application
      location.href = '/dashboard';
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.center_bg}>
        <Row justify="center" align="middle" className={styles.form_container}>
          <Col span={16} offset={6}>
            <Form
              name="basic"
              layout="vertical"
              labelCol={{ span: 16 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label={t('LOGIN.USERNAME')}
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={t('LOGIN.PASSWORD')}
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ span: 16 }}>
                <Button type="primary" htmlType="submit" block>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Login;
