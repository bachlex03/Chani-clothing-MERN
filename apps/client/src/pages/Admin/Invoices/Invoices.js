import { Fragment, useEffect, useLayoutEffect } from 'react';
import classNames from 'classnames/bind';

import style from './Invoices.module.scss';

import { Search, Button } from '~/components/adminComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

function Invoices() {
  return (
    <div className={cx('container')}>
      <p className={cx('heading-text')}>List view</p>

      <div>
        <div className="row">
          <div className="col l-3">
            <div className={cx('left-container')}>
              <div>
                <p className={cx('left-heading-text')}>Invoice List</p>
                <div className={cx('search-wrapper', 'flex items-center justify-between')}>
                  <Search />
                  <i className={cx('filter-icon')}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      data-lucide="sliders-horizontal"
                      class="lucide lucide-sliders-horizontal size-4"
                    >
                      <line x1="21" x2="14" y1="4" y2="4"></line>
                      <line x1="10" x2="3" y1="4" y2="4"></line>
                      <line x1="21" x2="12" y1="12" y2="12"></line>
                      <line x1="8" x2="3" y1="12" y2="12"></line>
                      <line x1="21" x2="16" y1="20" y2="20"></line>
                      <line x1="12" x2="3" y1="20" y2="20"></line>
                      <line x1="14" x2="14" y1="2" y2="6"></line>
                      <line x1="8" x2="8" y1="10" y2="14"></line>
                      <line x1="16" x2="16" y1="18" y2="22"></line>
                    </svg>
                  </i>
                </div>
                <div className={cx('list')}>
                  <div className={cx('item')}>
                    <div className={cx('item-heading')}>
                      <p className={cx('item-code')}>#TW15090251</p>
                      <span className={cx('item-status')}>Paid</span>
                    </div>

                    <p className={cx('item-customer')}>Paula Keenan</p>
                    <div className={cx('item-footer')}>
                      <p className={cx('item-price')}>$873.96</p>
                      <span className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          color="#92afd3"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          data-lucide="calendar-clock"
                          class="lucide lucide-calendar-clock inline-block size-4 ltr:mr-1 rtl:ml-1"
                        >
                          <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"></path>
                          <path d="M16 2v4"></path>
                          <path d="M8 2v4"></path>
                          <path d="M3 10h5"></path>
                          <path d="M17.5 17.5 16 16.25V14"></path>
                          <path d="M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"></path>
                        </svg>
                        <p className={cx('item-date', 'ml-4px')}>21 Jan, 2024</p>
                      </span>
                    </div>
                  </div>

                  <div className={cx('item')}>
                    <div className={cx('item-heading')}>
                      <p className={cx('item-code')}>#TW15090251</p>
                      <span className={cx('item-status')}>Paid</span>
                    </div>

                    <p className={cx('item-customer')}>Paula Keenan</p>
                    <div className={cx('item-footer')}>
                      <p className={cx('item-price')}>$873.96</p>
                      <span className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          color="#92afd3"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          data-lucide="calendar-clock"
                          class="lucide lucide-calendar-clock inline-block size-4 ltr:mr-1 rtl:ml-1"
                        >
                          <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"></path>
                          <path d="M16 2v4"></path>
                          <path d="M8 2v4"></path>
                          <path d="M3 10h5"></path>
                          <path d="M17.5 17.5 16 16.25V14"></path>
                          <path d="M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"></path>
                        </svg>
                        <p className={cx('item-date', 'ml-4px')}>21 Jan, 2024</p>
                      </span>
                    </div>
                  </div>

                  <div className={cx('item')}>
                    <div className={cx('item-heading')}>
                      <p className={cx('item-code')}>#TW15090251</p>
                      <span className={cx('item-status')}>Paid</span>
                    </div>

                    <p className={cx('item-customer')}>Paula Keenan</p>
                    <div className={cx('item-footer')}>
                      <p className={cx('item-price')}>$873.96</p>
                      <span className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          color="#92afd3"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          data-lucide="calendar-clock"
                          class="lucide lucide-calendar-clock inline-block size-4 ltr:mr-1 rtl:ml-1"
                        >
                          <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"></path>
                          <path d="M16 2v4"></path>
                          <path d="M8 2v4"></path>
                          <path d="M3 10h5"></path>
                          <path d="M17.5 17.5 16 16.25V14"></path>
                          <path d="M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"></path>
                        </svg>
                        <p className={cx('item-date', 'ml-4px')}>21 Jan, 2024</p>
                      </span>
                    </div>
                  </div>

                  <div className={cx('item')}>
                    <div className={cx('item-heading')}>
                      <p className={cx('item-code')}>#TW15090251</p>
                      <span className={cx('item-status')}>Paid</span>
                    </div>

                    <p className={cx('item-customer')}>Paula Keenan</p>
                    <div className={cx('item-footer')}>
                      <p className={cx('item-price')}>$873.96</p>
                      <span className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          color="#92afd3"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          data-lucide="calendar-clock"
                          class="lucide lucide-calendar-clock inline-block size-4 ltr:mr-1 rtl:ml-1"
                        >
                          <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"></path>
                          <path d="M16 2v4"></path>
                          <path d="M8 2v4"></path>
                          <path d="M3 10h5"></path>
                          <path d="M17.5 17.5 16 16.25V14"></path>
                          <path d="M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"></path>
                        </svg>
                        <p className={cx('item-date', 'ml-4px')}>21 Jan, 2024</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col l-9">
            <div className={cx('right-container')}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={cx('right-heading-text')}>#TW15090257</p>
                  <span className="flex mt-8px">
                    <p className={cx('create-date', 'mr-8px')}>Create: 10 July, 2023</p>
                    <p className={cx('due-date')}>Due: 10 July, 2023</p>
                  </span>
                </div>

                <div>
                  <Button>Save</Button>
                </div>
              </div>

              <div className={cx('content')}>
                <div className={cx('company-info')}>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAYAAADHl1ErAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMS1jMDAwIDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMi41IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGMDk0N0MyMDY4QjcxMUVFOTYxN0Q1OTIxQkQxNzgwRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGMDk0N0MyMTY4QjcxMUVFOTYxN0Q1OTIxQkQxNzgwRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkYwOTQ3QzFFNjhCNzExRUU5NjE3RDU5MjFCRDE3ODBEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkYwOTQ3QzFGNjhCNzExRUU5NjE3RDU5MjFCRDE3ODBEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+iIlVCAAACB1JREFUeNrsXGts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"
                    alt=""
                    style={{ width: '36px', height: '36px', marginLeft: '10px' }}
                  />
                  <p className={cx('company-name')}>Group1design</p>
                  <p className={cx('company-title')}>IT Software Company</p>
                </div>

                <div className={cx('invoice-info')}>
                  <div className={cx('heading-info', 'invoice-code')}>
                    <p className={cx('code')}>#TW15090254</p>
                    <p className={cx('sub')}>Invoice No</p>
                  </div>
                  <div className={cx('heading-info', 'invoice-create-date')}>
                    <p className={cx('date')}>10 July, 2023</p>
                    <p className={cx('sub')}>Create Date</p>
                  </div>
                  <div className={cx('heading-info', 'invoice-status')}>
                    <p className={cx('status')}>Paid</p>
                    <p className={cx('sub')}>Payment Status</p>
                  </div>
                  <div className={cx('heading-info', 'invoice-total')}>
                    <p className={cx('total')}>$873.96</p>
                    <p className={cx('sub')}>Total Amount</p>
                  </div>
                </div>

                <div className={cx('invoice-addresses')}>
                  <div className={cx('left')}></div>
                  <div className={cx('right')}></div>
                </div>

                <table className={cx('invoice-table')}>
                  <thead>
                    <tr className={cx('border-bottom')}>
                      <th className={cx('order')}>#</th>
                      <th className={cx('name')}>Item name</th>
                      <th className={cx('rate')}>Rate</th>
                      <th className={cx('quantity')}>Quantity</th>
                      <th className={cx('amount')}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={cx('border-bottom')}>
                      <td className={cx('order')}>1</td>
                      <td className={cx('name')}>
                        <p className={cx('name')}>Product - Premium Admin & Dashboard</p>
                        <p className={cx('desc')}>Build with Bootstrap, React JS, Angular, Vue etc.</p>
                      </td>
                      <td className={cx('rate')}>$24.00</td>
                      <td className={cx('quantity')}>2</td>
                      <td className={cx('amount')}>$48</td>
                    </tr>
                    <tr className={cx('border-bottom')}>
                      <td className={cx('order')}>1</td>
                      <td className={cx('name')}>
                        <p className={cx('name')}>Product - Premium Admin & Dashboard</p>
                        <p className={cx('desc')}>Build with Bootstrap, React JS, Angular, Vue etc.</p>
                      </td>
                      <td className={cx('rate')}>$24.00</td>
                      <td className={cx('quantity')}>2</td>
                      <td className={cx('amount')}>$48</td>
                    </tr>
                    <tr className={cx('border-bottom')}>
                      <td className={cx('order')}>1</td>
                      <td className={cx('name')}>
                        <p className={cx('name')}>Product - Premium Admin & Dashboard</p>
                        <p className={cx('desc')}>Build with Bootstrap, React JS, Angular, Vue etc.</p>
                      </td>
                      <td className={cx('rate')}>$24.00</td>
                      <td className={cx('quantity')}>2</td>
                      <td className={cx('amount')}>$48</td>
                    </tr>
                    <tr>
                      <td colSpan={3}></td>
                      <td className={cx('summary', 'border-bottom')}>Sub Total</td>
                      <td className={cx('amount', 'border-bottom')}>$48</td>
                    </tr>
                    <tr>
                      <td colSpan={3}></td>
                      <td className={cx('summary', 'border-bottom')}>Item Discounts (0%)</td>
                      <td className={cx('amount', 'border-bottom')}>$0</td>
                    </tr>
                    <tr>
                      <td colSpan={3}></td>
                      <td className={cx('summary', 'border-bottom')}>Shipping Charge</td>
                      <td className={cx('amount', 'border-bottom')}>$20</td>
                    </tr>
                    <tr>
                      <td colSpan={3}></td>
                      <td className={cx('summary', 'border-bottom', 'total')}>Total Amount</td>
                      <td className={cx('amount', 'border-bottom', 'total')}>$300.00</td>
                    </tr>
                  </tbody>
                </table>

                <div className={cx('note')}>
                  <p className={cx('note-content')}>
                    <strong>NOTES: </strong>
                    All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or credit
                    card or direct payment online. If account is not paid within 7 days the credits details supplied as
                    confirmation of work undertaken will be charged the agreed quoted fee noted above.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoices;
