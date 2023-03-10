// contracts/ERC721.sol
// Author: @hansrajrami
// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

contract KPRIET is Initializable, ERC721Upgradeable, OwnableUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIds;
    string public baseURI;
    mapping(uint256 => string) private _tokenURIs;

    function initialize(
        string memory name_,
        string memory symbol_,
        string memory baseURI_
    ) public initializer {
        __ERC721_init(name_, symbol_);
        __Ownable_init();
        baseURI = baseURI_;
    }

    function issueCertificate(address participant, string calldata _tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        uint256 newCertificateId = _tokenIds.current();
        _safeMint(participant, newCertificateId);
        _tokenURIs[newCertificateId] = _tokenURI;
        
        _tokenIds.increment();
        return newCertificateId;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        _requireMinted(tokenId);
        string memory baseUri = _baseURI();
        return string(abi.encodePacked(baseUri, _tokenURIs[tokenId]));
    }

    function contractURI() public pure returns (string memory) {
        return "https://gist.githubusercontent.com/hansrajrami/360c214a41eaba21d0b1fdcaacc48d79/raw/a13fd07e1444606df2c501f9720c9a1453fa6ded/kpriet-nft-demo.json";
    }
}