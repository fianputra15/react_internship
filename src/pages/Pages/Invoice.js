import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { Wrapper } from '../../components';
import { formatPrice } from '../../helpers';
import { withStyles } from '@material-ui/core/styles';
import { mockInvoice } from '../../utils/mock';

const CustomTableCell = withStyles(theme => ({
  body: {
    borderBottomColor: 'transparent',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}))(TableCell);

const Invoice = () => {
  const getSubTotal = () => {
    let total = 0.0;
    for (let i = 1; i < mockInvoice.length; i++) {
      total += mockInvoice[i].price * mockInvoice[i].quantity;
    }
    return total;
  };

  const getCalculatedTax = () => {
    return (15 * getSubTotal()) / 100;
  };

  const getTotal = () => {
    return getSubTotal() + getCalculatedTax();
  };

  return (
    <Wrapper>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom className="font-weight-bold">
            INVOICE
          </Typography>
          <Typography variant="body1" className="mb-1">
            <Link to="/">company@address.com</Link>
          </Typography>
          <Grid
            container
            spacing={3}
            alignItems="flex-start"
            direction="row"
            justify="space-between"
          >
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" gutterBottom>
                Client
              </Typography>
              <Typography variant="body1">Invoice No: #0001</Typography>
              <Typography variant="body1">Date issued: 01 Jun 2017</Typography>
              <Typography variant="body1">Due date: 31 May 2017</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className="text-sm-right text-xs-left">
              <Typography variant="body2" gutterBottom>
                Company LLC
              </Typography>
              <Typography variant="body1">company@address.com</Typography>
              <Typography variant="body1">1234 Main</Typography>
              <Typography variant="body1">Apt. 4B</Typography>
              <Typography variant="body1">Springfield, ST 54321</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <div className="table-responsive">
          <Table>
            <TableHead>
              <TableRow>
                <CustomTableCell>Description</CustomTableCell>
                <CustomTableCell align="right">Unit Price</CustomTableCell>
                <CustomTableCell align="right">Quantity</CustomTableCell>
                <CustomTableCell align="right">Amount</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockInvoice.map((item, index) => (
                <TableRow key={index}>
                  <CustomTableCell>
                    <Typography variant="body1" className="font-weight-bold">
                      {item.title}
                    </Typography>
                    <Typography variant="body1">{item.subtitle}</Typography>
                  </CustomTableCell>
                  <CustomTableCell align="right">
                    {formatPrice(item.price)}
                  </CustomTableCell>
                  <CustomTableCell align="right">
                    {item.quantity}
                  </CustomTableCell>
                  <CustomTableCell align="right">
                    {formatPrice(item.price * item.quantity)}
                  </CustomTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Divider />
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={6} sm={3} className="mt-xs mb-xs">
              <Typography
                variant="caption"
                className="font-weight-bold text-uppercase"
              >
                Subtotal
              </Typography>
              <Typography variant="h4">{formatPrice(getSubTotal())}</Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sm={3}
              className="mt-xs mb-xs text-sm-right text-md-left"
            >
              <Typography
                variant="caption"
                className="font-weight-bold text-uppercase"
              >
                Tax (15%)
              </Typography>
              <Typography variant="h4">
                {formatPrice(getCalculatedTax())}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} className="mt-xs mb-xs">
              <Typography
                variant="caption"
                className="font-weight-bold text-uppercase"
              >
                Discount
              </Typography>
              <Typography variant="h4">$0.00</Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sm={3}
              className="mt-xs mb-xs text-xs-left text-sm-right"
            >
              <Typography
                variant="caption"
                className="font-weight-bold text-uppercase"
              >
                Total
              </Typography>
              <Typography variant="h4">{formatPrice(getTotal())}</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardContent>
          <Typography variant="caption">
            <strong>PAYMENT TERMS AND POLICIES </strong>. All accounts are to be
            paid within 7 days from receipt of invoice. To be paid by cheque or
            credit card or direct payment online. If account is not paid within
            7 days the credits details supplied as confirmation of work
            undertaken will be charged the agreed quoted fee noted above. If the
            Invoice remails unpaid. our dept recovery agency, Urban, may charge
            you a fee of 25% of the unpaid portion of the invoice amount and
            other legal and collection costs not covered by the fee.
          </Typography>
        </CardContent>
      </Card>
    </Wrapper>
  );
};

export default Invoice;
