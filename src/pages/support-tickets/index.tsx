import Button from "@component/buttons/Button";
import IconButton from "@component/buttons/IconButton";
import { Chip } from "@component/Chip";
import FlexBox from "@component/FlexBox";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Pagination from "@component/pagination/Pagination";
import PaginationRow from "@component/pagination/PaginationRow";
import ShowingItemNumber from "@component/pagination/ShowingItemNumber";
import TableRow from "@component/TableRow";
import Typography, { SemiSpan, Small } from "@component/Typography";
import useUserInf from "@customHook/useUserInf";
import { Ticket_By_User_Id, Ticket_Priority_All, Ticket_Status_All } from "@data/constants";
import axios from "axios";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";


const TicketList = () => {

  const [tickets, setTickets] = useState([])
  const [priorities, setPriorities] = useState([])
  const [statuss, setStatuss] = useState([])
  const [totalPage, setTotalPage] = useState(0)
  const [totalTicket, setTotalTicket] = useState(0)

  const { user_id } = useUserInf()

  useEffect(() => {
    axios.get(`${Ticket_Priority_All}`).then(res => {
      setPriorities(res?.data?.ticket_priorities)
    }).catch(() => {})

    axios.get(`${Ticket_Status_All}`).then(res => {
      console.log("ticket_Status_Res", res)
      setStatuss(res?.data?.ticket_statuses)
    }).catch(() => {})
  }, [])

  const router = useRouter()

  const { page, size } = router.query

  useEffect(() => {
    axios.get(`${Ticket_By_User_Id}${user_id}?page=${page || 1}&size=${size || 10}`).then(res => {
      console.log("ticketRes", res)
      setTickets(res?.data?.tickets)
      setTotalPage(res?.data?.total_pages)
      setTotalTicket(res?.data?.total_elements)
    }).catch(() => {})
  }, [page, size])

  return (
    <div>
      <DashboardPageHeader title="Support Ticket" iconName="support"
        button={
          <Link href="/open-ticket">
            <a>
              <Button color="primary" bg="primary.light" px="2rem">
                Open Ticket
              </Button>
            </a>
          </Link>
        } />

      {tickets.map((item) => (
        <Link href={`/support-tickets/${item?.id}`} key={item?.id}>
          <TableRow
            as="a"
            href={`/support-tickets/${item?.id}`}
            my="1rem"
            padding="15px 24px"
          >
            <div>
              <span>{item?.subject}</span>
              <FlexBox alignItems="center" flexWrap="wrap" pt="0.5rem" m="-6px">
                <Chip p="0.25rem 1rem" bg="primary.light" m="6px">
                  <Small color="primary.main">{priorities.find((data) => data?.id == item?.ticket_priority)?.name}</Small>
                </Chip>
                <Chip p="0.25rem 1rem" bg="success.light" m="6px">
                  <Small color="success.main">{statuss.find((data) => data?.id == item?.ticket_status)?.name}</Small>
                </Chip>
                <SemiSpan className="pre" m="6px">
                  {format(new Date(item?.created_at), "MMM dd, yyyy")}
                </SemiSpan>
                <SemiSpan m="6px">Website Problem</SemiSpan>
              </FlexBox>
            </div>

            <Hidden flex="0 0 0 !important" down={769}>
              <Typography textAlign="center" color="text.muted">
                <IconButton size="small">
                  <Icon variant="small" defaultcolor="currentColor">
                    arrow-right
                  </Icon>
                </IconButton>
              </Typography>
            </Hidden>
          </TableRow>
        </Link>
      ))}

      <FlexBox
        flexWrap="wrap"
        justifyContent="space-around"
        alignItems="center"
        mt="32px"
      >
        <SemiSpan>Showing <ShowingItemNumber initialNumber={10} totalItem={totalTicket} /> of {totalTicket} Tickets</SemiSpan>

        <Pagination pageCount={totalPage} />

        <PaginationRow product_per_page_option={product_per_page_options} name="Ticket" />
      </FlexBox>
    </div>
  );
};

const product_per_page_options = [
  { id: 10, name: 10 },
  { id: 30, name: 30 },
  { id: 50, name: 50 },
]

TicketList.layout = DashboardLayout;

export default TicketList;
