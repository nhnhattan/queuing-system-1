import './ListReport.css';
import style from './ListReport.module.scss';
import classNames from 'classnames/bind';
import { DatePicker } from 'antd';
import { LogoArrow } from '../../../../assets/svg/LogoArrow';
import { routesConfig } from '../../../../routes/routeConfig';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { CustomerServiceType } from '../../../propsType/CustomerServiceProps';
import { CustomizeTable } from '../../../componentChild/CustomizeTable/CustomizeTable';
import { LinkAction } from '../../../componentChild/LinkAction/LinkAction';
import { LogoDownload } from '../../../../assets/svg/LogoDownload';
import { State } from '../../../../redux/store';
const cx = classNames.bind(style);
const columns: any = [
      {
            title: 'Số thứ tự',
            dataIndex: 'key',
      },
      {
            title: 'Tên dịch vụ',
            dataIndex: 'serviceName',
            render: (data: string) => {
                  return (
                        <>
                              <span className="text-devices">{data}</span>
                        </>
                  );
            },
      },
      {
            title: 'Thời gian cấp',
            dataIndex: 'timeStart',
      },
      {
            title: 'Tình trạng',
            dataIndex: 'statusLevel',
            render: (data: string) => {
                  if (data === 'skip') {
                        return (
                              <>
                                    <span style={{ color: 'var(--color-red)', marginRight: '10px' }}>&#9679;</span>
                                    <span>Bỏ qua</span>
                              </>
                        );
                  } else if (data === 'complete') {
                        return (
                              <>
                                    <span style={{ color: 'var(--color-gray-500)', marginRight: '10px' }}>&#9679;</span>
                                    <span>Đã sử dụng</span>
                              </>
                        );
                  } else if (data === 'waiting') {
                        return (
                              <>
                                    <span style={{ color: 'var(--color-blue)', marginRight: '10px' }}>&#9679;</span>
                                    <span>Đang chờ</span>
                              </>
                        );
                  }
            },
      },
      {
            title: 'Nguồn cấp',
            dataIndex: 'origin',
      },
];

export const ListReport = () => {
      const dataRef = useRef<CustomerServiceType[] | []>([]);
      const [dataSource, setDataSource] = useState<CustomerServiceType[] | []>([]);
      const data = useSelector((state: State) => state.customerService);
      useEffect(() => {
            dataRef.current = data.dataCustomerServices;
            setDataSource(data.dataCustomerServices);
      }, []);
      const pageSize = 9;
      const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
      return (
            <div className={cx('report-wrapper')}>
                  <div className={cx('select')}>
                        <h3 className={cx('title')}>Chọn thời gian</h3>
                        <div className="selectDateGroup">
                              <DatePicker
                                    className="selectDate"
                                    format={dateFormatList}
                                    popupClassName="popup-date"
                                    placeholder="Từ ngày"
                              />
                              <LogoArrow className="selectDate-logoArrow" />
                              <DatePicker
                                    className="selectDate"
                                    format={dateFormatList}
                                    popupClassName="popup-date"
                                    placeholder="Đến ngày"
                              />
                        </div>
                  </div>
                  <div className="tableReport">
                        <CustomizeTable columns={columns} dataSource={dataSource} pageSize={pageSize} />

                        <LinkAction title="Tải về" to={routesConfig.addCustomerService} logo={<LogoDownload />} />
                  </div>
            </div>
      );
};
