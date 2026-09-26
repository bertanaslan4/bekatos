$TTL 3600
@   IN  SOA ns1.bekatos.com. hostmaster.bekatos.com. (
        2026092602 ; serial
        3600       ; refresh
        900        ; retry
        1209600    ; expire
        300        ; negative cache TTL
)

@       IN  NS  ns1.bekatos.com.
@       IN  NS  ns2.bekatos.com.
@       IN  A   70.40.139.249
www     IN  A   70.40.139.249
ns1     IN  A   70.40.139.249
ns2     IN  A   70.40.139.249
server  IN  A   70.40.139.249
