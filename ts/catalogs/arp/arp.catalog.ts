export const arpTable = {
    "Cisco-IOS-XE-arp-oper:arp-data": {
      "arp-vrf": [
        {
          "vrf": "Default",
          "arp-oper": [
            {
              "address": "192.168.1.70",
              "enctype": "ios-encaps-type-arpa",
              "interface": "GigabitEthernet1.20",
              "type": "ios-linktype-ip",
              "mode": "ios-arp-mode-interface",
              "hwtype": "ios-snpa-type-ieee48",
              "hardware": "0c:12:9a:d3:00:00",
              "time": "2024-04-15T20:11:07.000395+00:00"
            },
            {
              "address": "192.168.1.78",
              "enctype": "ios-encaps-type-arpa",
              "interface": "GigabitEthernet1.10",
              "type": "ios-linktype-ip",
              "mode": "ios-arp-mode-interface",
              "hwtype": "ios-snpa-type-ieee48",
              "hardware": "0c:12:9a:d3:00:00",
              "time": "2024-04-15T20:11:07.000393+00:00"
            },
            {
              "address": "192.168.10.25",
              "enctype": "ios-encaps-type-arpa",
              "interface": "GigabitEthernet2",
              "type": "ios-linktype-ip",
              "mode": "ios-arp-mode-dynamic",
              "hwtype": "ios-snpa-type-ieee48",
              "hardware": "0c:ba:4f:77:00:01",
              "time": "2024-04-15T20:11:13.000626+00:00"
            },
            {
              "address": "192.168.10.26",
              "enctype": "ios-encaps-type-arpa",
              "interface": "GigabitEthernet2",
              "type": "ios-linktype-ip",
              "mode": "ios-arp-mode-interface",
              "hwtype": "ios-snpa-type-ieee48",
              "hardware": "0c:12:9a:d3:00:01",
              "time": "2024-04-15T20:11:07.000395+00:00"
            },
            {
              "address": "192.168.10.29",
              "enctype": "ios-encaps-type-arpa",
              "interface": "GigabitEthernet3",
              "type": "ios-linktype-ip",
              "mode": "ios-arp-mode-dynamic",
              "hwtype": "ios-snpa-type-ieee48",
              "hardware": "0c:31:1d:f9:00:02",
              "time": "2024-04-15T20:26:36.000079+00:00"
            },
            {
              "address": "192.168.10.30",
              "enctype": "ios-encaps-type-arpa",
              "interface": "GigabitEthernet3",
              "type": "ios-linktype-ip",
              "mode": "ios-arp-mode-interface",
              "hwtype": "ios-snpa-type-ieee48",
              "hardware": "0c:12:9a:d3:00:02",
              "time": "2024-04-15T20:11:07.000395+00:00"
            },
            {
              "address": "192.168.122.1",
              "enctype": "ios-encaps-type-arpa",
              "interface": "GigabitEthernet4",
              "type": "ios-linktype-ip",
              "mode": "ios-arp-mode-dynamic",
              "hwtype": "ios-snpa-type-ieee48",
              "hardware": "52:54:00:6d:8f:be",
              "time": "2024-04-15T20:30:40.000759+00:00"
            },
            {
              "address": "192.168.122.21",
              "enctype": "ios-encaps-type-arpa",
              "interface": "GigabitEthernet4",
              "type": "ios-linktype-ip",
              "mode": "ios-arp-mode-interface",
              "hwtype": "ios-snpa-type-ieee48",
              "hardware": "0c:12:9a:d3:00:03",
              "time": "2024-04-15T20:11:16.000591+00:00"
            }
          ]
        }
      ]
    }
  };

export interface ArpInterface {
  // "Cisco-IOS-XE-arp-oper:arp-data": {
    // "arp-vrf": [
    //   {
        "vrf": string,
        "arp-oper": [
          {
            "address": string,
            "enctype": string,
            "interface": string,
            "type": string,
            "mode": string,
            "hwtype": string,
            "hardware": string,
            "time": string
          },
          {
            "address": string,
            "enctype": string,
            "interface": string,
            "type": string,
            "mode": string,
            "hwtype": string,
            "hardware": string,
            "time": string
          },
          {
            "address": string,
            "enctype": string,
            "interface": string,
            "type": string,
            "mode": string,
            "hwtype": string,
            "hardware": string,
            "time": string
          },
          {
            "address": string,
            "enctype": string,
            "interface": string,
            "type": string,
            "mode": string,
            "hwtype": string,
            "hardware": string,
            "time": string
          },
          {
            "address": string,
            "enctype": string,
            "interface": string,
            "type": string,
            "mode": string,
            "hwtype": string,
            "hardware": string,
            "time": string
          },
          {
            "address": string,
            "enctype": string,
            "interface": string,
            "type": string,
            "mode": string,
            "hwtype": string,
            "hardware": string,
            "time": string
          },
          {
            "address": string,
            "enctype": string,
            "interface": string,
            "type": string,
            "mode": string,
            "hwtype": string,
            "hardware": string,
            "time": string
          },
          {
            "address": string,
            "enctype": string,
            "interface": string,
            "type": string,
            "mode": string,
            "hwtype": string,
            "hardware": string,
            "time": string
          }
        ]
      }
    // ]
  // }
// };