import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import { EditableArea } from '@magnolia/react-editor';
import { HomeHeader } from './Home';
import { get } from '../../utils';
import MagnoliaContext from '../../utils/MagnoliaContext';
import { baseUrl, i18n, insurancePoliciesApi, insuranceInvoicesApi, insuranceClaimsApi } from '../../utils/config';
import file from '../../images/file.png';
import edit from '../../images/edit.png';
import download from '../../images/download.png';

const statusClassName = {
  paid: 'green-label',
  open: 'lightRed-label',
  overdue: 'red-label',
  cancelled: 'grey-label',
};

function Portal(props) {
  const { title, description, main } = props;
  const [user, setUser] = useState();
  const [policies, setPolicies] = useState();
  const [invoices, setInvoices] = useState();
  const [claims, setClaims] = useState();
  const magnoliaContext = useContext(MagnoliaContext);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    setUser(storedUser);
  }, []);

  useEffect(() => {
    async function getUserData() {
      const userData = await Promise.all([
        get(insurancePoliciesApi + magnoliaContext.search + '&policyNumber=' + user.id),
        get(insuranceInvoicesApi + magnoliaContext.search + '&policyNumber=' + user.id),
        get(insuranceClaimsApi + magnoliaContext.search + '&userNumber=' + user.id),
      ]);

      if (userData[0]) setPolicies(userData[0].results);
      if (userData[1]) setInvoices(userData[1].results);
      if (userData[2]) {
        userData[2].results.sort((a, b) => new Date(b.date) - new Date(a.date));
        setClaims(userData[2].results);
      }
    }

    if (user) getUserData();
  }, [user]);

  return (
    <div className='Portal'>
      <HomeHeader />
      <div className='box'>
        <div className='text-center'>
          {title && <div className='page-title'>{title}</div>}
          {description && <div className='text'>{description}</div>}
        </div>
        <div className='supTitle'>{i18n.policies}</div>
        <div className='Policies__wrapper'>
          {policies?.length > 0 ? (
            <>
              {policies.map((policy) => (
                <a href={baseUrl + policy.upload['@link']} className='btn-blue' key={policy['@id']}>
                  <Image src={file} width='20' height='20' />
                  <span>{policy.year}</span>
                </a>
              ))}
              <button className='btn-blue-full'>
                <Image src={edit} width='20' height='20' />
                <span>{i18n.modifyPolicy}</span>
              </button>
            </>
          ) : (
            <em>{i18n.noPolicies}</em>
          )}
        </div>
        <div className='supTitle'>{i18n.invoices}</div>
        <div className='Invoices__wrapper'>
          {invoices?.length > 0 ? (
            <table className='Invoices__table'>
              <thead>
                <tr>
                  <th width="3%"/>
                  <th>{i18n.nr}</th>
                  <th>{i18n.date}</th>
                  <th>{i18n.status}</th>
                  <th style={{minWidth:'220px', width:'20%'}}>{i18n.download}</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice['@id']}>
                    <td>
                      <span className={`Invoices__status ${statusClassName[invoice.status]}`}></span>
                    </td>
                    <td>
                      <b>{invoice.name}</b>
                    </td>
                    <td>
                      {invoice.month} {invoice.year}
                    </td>
                    <td>{invoice.status}</td>
                    <td className='Invoices__download'>
                      <a href={baseUrl + invoice.upload['@link']} className='btn-blue small'>
                        <Image src={download} width='20' height='20' />
                        <span>{i18n.download}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <em>{i18n.noInvoices}</em>
          )}
        </div>
        <div className='supTitle'>{i18n.claims}</div>
        <div className='Invoices__wrapper'>
          {claims?.length > 0 ? (
            <table className='Invoices__table'>
              <thead>
                <tr>
                  <th width="3%"/>
                  <th>{i18n.status}</th>
                  <th>{i18n.type}</th>
                  <th>{i18n.date}</th>
                  <th>{i18n.policyNumber}</th>
                  <th style={{minWidth:'220px', width:'20%'}}>{i18n.details}</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((claim, i) => (
                  <React.Fragment key={claim['@id']}>
                    <tr key={claim['@id']}>
                      <td>{i + 1}</td>
                      <td>{i18n[claim.status]}</td>
                      <td>{i18n[claim.type]}</td>
                      <td>{new Date(claim.date).toLocaleDateString()}</td>
                      <td>{claim.policyNumber?.name}</td>
                      <td>
                        <span
                          className='btn-blue small'
                          onClick={function (e) {
                            e.target.parentElement.parentElement.nextElementSibling.classList.toggle(
                              'Portal__hiddenRow'
                            );
                          }}
                        >
                          {i18n.details}
                        </span>
                      </td>
                    </tr>
                    <tr className='Portal__hiddenRow'>
                      <td colSpan='6'>
                        <div>
                          <b>{i18n.policeReport}</b> {claim.policeReport ? i18n.yes : i18n.no}
                        </div>
                        <div>
                          <b>{i18n.location}</b> {claim.location}
                        </div>
                        <div>
                          <p dangerouslySetInnerHTML={{ __html: claim.facts }} />
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          ) : (
            <em>{i18n.noClaims}</em>
          )}
        </div>
      </div>
      {main && <EditableArea content={main} />}
    </div>
  );
}

export default Portal;
