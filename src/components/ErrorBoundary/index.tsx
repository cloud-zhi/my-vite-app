import React, { Component } from 'react';
import { Result } from 'antd';

export default class ErrorBoundary extends Component<{
  children: React.ReactNode;
  hasError?: boolean;
}> {
  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  state = { hasError: false };

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      console.log(1);

      return (
        <Result
          status="500"
          title="500"
          subTitle="抱歉，服务器出错了，请刷新重试"
        />
      );
    }
    return children;
  }
}
